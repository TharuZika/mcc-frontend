"use client";

import { LoadScript } from "@react-google-maps/api";
import { SessionProvider } from "next-auth/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <LoadScript
        googleMapsApiKey={"AIzaSyADfZDIswSP8lZkCNcBQNdlRb40x19VFmA"}
        libraries={["places"]}
        >
        {children}
      </LoadScript>
    </SessionProvider>
  );
} 