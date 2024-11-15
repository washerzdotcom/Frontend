const baseUrl = `https://live-server-101289.wati.io`;
const washrzserver = true
  ? `http://localhost:5000`
  : // : `https://washrzbackend.vercel.app`;
    `http://51.20.124.72:5002`;
const Authkey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4NTFjMDk2Yy0xODk0LTQwODYtODRmMC1mM2ZjYTBjYzQwYTAiLCJ1bmlxdWVfbmFtZSI6ImFiaGlzaGVrLm1hdXJ5YUBkYXRhYmVsbC5pbiIsIm5hbWVpZCI6ImFiaGlzaGVrLm1hdXJ5YUBkYXRhYmVsbC5pbiIsImVtYWlsIjoiYWJoaXNoZWsubWF1cnlhQGRhdGFiZWxsLmluIiwiYXV0aF90aW1lIjoiMDgvMzAvMjAyNCAxMDoxNzo1MiIsImRiX25hbWUiOiJtdC1wcm9kLVRlbmFudHMiLCJ0ZW5hbnRfaWQiOiIxMDEyODkiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJERVZFTE9QRVIiLCJleHAiOjI1MzQwMjMwMDgwMCwiaXNzIjoiQ2xhcmVfQUkiLCJhdWQiOiJDbGFyZV9BSSJ9.yJ9mBiaXUweXkHW8oHv02gl6_wqY2ieGs7RFrYM8wpI";
export default { baseUrl, Authkey, washrzserver };
