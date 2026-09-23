import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: { colors: {
    krishiq: { 50:"#f4f8e9",100:"#e8f0d1",200:"#cfdfa5",500:"#668c3a",600:"#52752e",700:"#3f5f25",900:"#263b1a" },
    harvest:"#f2a23a", soil:"#7b5735"
  }, fontFamily:{ serif:["Newsreader","ui-serif","serif"], mono:['"JetBrains Mono"','ui-monospace','monospace'] }, boxShadow:{ soft:"0 10px 30px rgba(38,59,26,.08)"}}},
  plugins:[]
};
export default config;
