"use client";

import { Provider } from "react-redux";
import { reduxStore } from "../store/reduxStore";

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <Provider store={reduxStore}>
      {children}
    </Provider>
  );
}