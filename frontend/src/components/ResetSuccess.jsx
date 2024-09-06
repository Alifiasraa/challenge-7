import React from "react";

const ResetSuccess = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 text-center bg-white rounded-lg shadow-lg">
        <h1 className="mb-4 text-3xl font-bold">Reset Password Berhasil</h1>
        <p className="mb-6 text-gray-700">
          Password Anda telah berhasil direset. Anda sekarang dapat masuk dengan
          password baru Anda.
        </p>
        <a href="/login" className="underline hover:text-blue-500">
          Login Sekarang
        </a>
      </div>
    </div>
  );
};

export default ResetSuccess;
