"use client";

import { createContext, useContext, useState } from "react";

type Position = {
  lat: number;
  lng: number;
};

type MapContextType = {
  selectedPosition: Position | null;
  setSelectedPosition: (position: Position) => void;
};

const MapContext = createContext<MapContextType | null>(null);

export function MapProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedPosition, setSelectedPosition] =
    useState<Position | null>(null);

  return (
    <MapContext.Provider
      value={{
        selectedPosition,
        setSelectedPosition,
      }}
    >
      {children}
    </MapContext.Provider>
  );
}

export function useMapContext() {
  const context = useContext(MapContext);

  if (!context) {
    throw new Error("MapContext not found");
  }

  return context;
}