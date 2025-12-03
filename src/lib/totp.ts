class TOTP {
  private period: number;
  private algorithm: string;
  private digits: number;

  constructor() {
    this.period = 30;
    this.algorithm = "SHA-1";
    this.digits = 6;
  }

  // Convert base32 to byte array
  private base32ToBytes(base32: string): Uint8Array {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
    let bits = "";

    for (const char of base32.replace(/=+$/, "")) {
      const val = alphabet.indexOf(char.toUpperCase());
      bits += val.toString(2).padStart(5, "0");
    }

    const bytes = [];
    for (let i = 0; i + 8 <= bits.length; i += 8) {
      bytes.push(parseInt(bits.substring(i, i + 8), 2));
    }

    return new Uint8Array(bytes);
  }

  // HMAC-SHA1
  private async hmacSHA1(
    key: Uint8Array,
    message: ArrayBuffer
  ): Promise<Uint8Array> {
    const keyBuffer = new Uint8Array(key);
    const cryptoKey = await crypto.subtle.importKey(
      "raw",
      keyBuffer,
      { name: "HMAC", hash: { name: "SHA-1" } },
      false,
      ["sign"]
    );

    const sig = await crypto.subtle.sign("HMAC", cryptoKey, message);
    return new Uint8Array(sig);
  }

  // Generate OTP
  private async generateOTP(secret: string): Promise<string> {
    const timestamp = Date.now();
    const keyBytes = this.base32ToBytes(secret);

    const counter = Math.floor(timestamp / 1000 / this.period);

    // Counter → 8-byte buffer
    const msg = new ArrayBuffer(8);
    const view = new DataView(msg);
    view.setUint32(4, counter);

    const hmac = await this.hmacSHA1(keyBytes, msg);
    const offset = hmac[hmac.length - 1] & 0xf;

    const binary =
      ((hmac[offset] & 0x7f) << 24) |
      (hmac[offset + 1] << 16) |
      (hmac[offset + 2] << 8) |
      hmac[offset + 3];

    const otp = (binary % 1_000_000).toString().padStart(this.digits, "0");
    return otp;
  }

  // Generate base32 secret
  public generateSecret(): string {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
    const length = 32; // Define the length of the secret
    const bytes = new Uint8Array(length);

    crypto.getRandomValues(bytes);

    let secret = "";
    for (const b of bytes) {
      secret += alphabet[b % 32];
    }

    return secret;
  }

  // Generate TOTP URL for QR code
  public generateTOTPURL({
    secret,
    username,
    issuer,
  }: {
    secret: string;
    username: string;
    issuer: string;
  }): string {
    return `otpauth://totp/${encodeURIComponent(issuer)}:${encodeURIComponent(
      username
    )}?secret=${secret}&issuer=${encodeURIComponent(issuer)}&algorithm=${
      this.algorithm
    }&digits=${this.digits}&period=${this.period}`;
  }

  // Verify OTP
  public async verifyOTP(secret: string, otp: string): Promise<boolean> {
    const generatedOTP = await this.generateOTP(secret);
    return generatedOTP === otp;
  }

  // Get current OTP
  public async getCurrentOTP(secret: string): Promise<string> {
    return this.generateOTP(secret);
  }
}

const totp = new TOTP();

export default totp;
