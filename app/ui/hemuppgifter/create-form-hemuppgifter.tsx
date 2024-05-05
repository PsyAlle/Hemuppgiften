'use client';

import { CustomerField } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createHemuppgift } from '@/app/lib/actions';
import { useFormState } from 'react-dom';




export default function Form({ customers }: { customers: CustomerField[] }) {
  const initialState = { message: null, errors: {} };
const types = ["Funktionell analys", "Beteendeexperiment", "Psykoedukation"]

  const [state, dispatch] = useFormState(createHemuppgift, initialState);
  return( <form action={dispatch}>

      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Hemuppgift Typ */}
        <div className="mb-4">
          <label htmlFor="type" className="mb-2 block text-sm font-medium">
            Välj typ av hemuppgift
          </label>
          <div className="relative">
            <select
              id="type"
              name="type"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="type-error"
            >
              <option value="" disabled>
                Välj en typ
              </option>
              {types.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="customer-type" aria-live="polite" aria-atomic="true">
        {state.errors?.type &&
          state.errors.type.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
        </div>
           {/* -namn */}
           <div className="mb-4">
          <label htmlFor="title" className="mb-2 block text-sm font-medium">
            Lägg till ett namn på hemuppgiften
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="title"
                name="title"
                type="text"
                step="0.01"
                placeholder="Lägg till namn"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          
        </div>
        <div id="dup-error" aria-live="polite" aria-atomic="true">
        {state.messagedup &&
            <p className="mt-2 text-sm text-red-500" key="duberror">
              {state.messagedup}
            </p>
          }
      </div>

        <div id="title-error" aria-live="polite" aria-atomic="true">
        {state.errors?.title &&
          state.errors.title.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
          </div>
        </div>


        {/* Invoice Amount */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Lägg till länk till hemuppgiften
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="link"
                name="link"
                type="text"
                step="0.01"
                placeholder="Lägg till länk"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          
        </div>
        
        <div id="amount-error" aria-live="polite" aria-atomic="true">
        {state.errors?.link &&
          state.errors.link.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
          </div>
        </div>

         {/* Invoice Amount */}
         <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Lägg till en kort beskrivning av hemuppgiften
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="besk"
                name="besk"
                type="text"
                step="0.01"
                placeholder="Beskriv hemuppgiften"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                
              />
          
        </div>
        
        <div id="amount-error" aria-live="polite" aria-atomic="true">
        {state.errors?.besk &&
          state.errors.besk.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>

  
      <p className="mt-2 text-sm text-red-500" key="error">
              {state.message}
            </p>
     
          </div>
        </div>

      
  
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/invoices"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Lägg till</Button>
      </div>


      </form>
  );
}
