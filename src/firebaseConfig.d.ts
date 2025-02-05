// src/firebaseConfig.d.ts
declare module "../../firebaseConfig" {
  const value: {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
  };
  export default value;
}
