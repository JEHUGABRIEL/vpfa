"use client";

import { type FormEvent, startTransition, useActionState } from "react";

/**
 * useActionState without React's automatic form reset: submitting through
 * onSubmit keeps what the user typed when the server returns an error.
 */
export function useActionForm<State>(
  action: (state: Awaited<State>, formData: FormData) => State | Promise<State>,
  initialState: Awaited<State>,
) {
  const [state, dispatch, pending] = useActionState(action, initialState);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => dispatch(formData));
  }

  return { state, onSubmit, pending };
}
