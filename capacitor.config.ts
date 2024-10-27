import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  plugins: {
    FirebaseAuthentication: {
      skipNativeAuth: false,
      providers: ["google.com"],
    },
  },
  appId: 'io.ionic.starter',
  appName: 'ionic-app-yala',
  webDir: 'www'
};

export default config;
