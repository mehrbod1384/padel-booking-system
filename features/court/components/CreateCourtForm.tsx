"use client";

import { useState } from "react";
import { useCreateCourt } from "../hooks/useCreateCourt";

export default function CreateCourtForm() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const { createCourtMutation, isCreating } = useCreateCourt();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createCourtMutation(
      {
        name,
        price: Number(price),
      },
      {
        onSuccess: () => {
          setName("");
          setPrice("");
        },
      },
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Court Name"
        />
      </div>

      <div>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
        />
      </div>

      <button type="submit" disabled={isCreating}>
        {isCreating ? "Creating..." : "Create Court"}
      </button>
    </form>
  );
}
