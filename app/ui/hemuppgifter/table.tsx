import Image from 'next/image';
import { UpdateInvoice, DeleteInvoice } from '@/app/ui/invoices/buttons';

import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredInvoices, fetchFilteredhemuppgifter } from '@/app/lib/data';
import {

  DocumentIcon,
} from '@heroicons/react/24/outline';

export default async function InvoicesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {

  const hemuppgifter = await fetchFilteredhemuppgifter(query, currentPage);
//console.log(hemuppgifter)

  return (
    <div className="mt-6 flow-root">
    <div className="inline-block min-w-full align-middle">
      <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
        <div className="md:hidden">
          {hemuppgifter?.map((hemuppgift, index) => (
            <div
              key={index}
              className="mb-2 w-full rounded-md bg-white p-4"
            >
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <div className="mb-2 flex items-center">
             
                    <p>{hemuppgift.title}</p>
                  </div>

                  <p className="text-sm ">{hemuppgift.besk}</p>
                </div>
    
              </div>
              <div className="flex w-full items-center justify-between pt-4">
                <div>
                  <p className="text-sm font-medium">
              {hemuppgift.type}
                  </p>
                  <p>{formatDateToLocal(hemuppgift.date)}</p>
                </div>
                <div className="flex justify-end gap-2">
                 
                </div>
              </div>
            </div>
          ))}
        </div>


{/* ------------------För desktop------------------------- */}

  
        <table className="hidden min-w-full text-gray-900 md:table">
          <thead className="rounded-lg text-left text-sm font-normal">
            <tr>
              <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
Namn              </th>
              <th scope="col" className="px-3 py-5 font-medium">
                Beskrivning
              </th>
              <th scope="col" className="px-3 py-5 font-medium">
                Typ
              </th>
              <th scope="col" className="px-3 py-5 font-medium">
                Tillagd
              </th>
      
              <th scope="col" className="relative py-3 pl-6 pr-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {hemuppgifter?.map((hemuppgift, index) => (
              <tr
                key={index}
                className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
              >
                <td className="whitespace-nowrap py-3 pl-6 pr-3">
                  <div className="flex items-center gap-3">
             
                    <p>{hemuppgift.title}</p>
                  </div>
                </td>
                <td className="whitespace-nowrap px-3 py-3">
                  {hemuppgift.besk}
                </td>
                <td className="whitespace-nowrap px-3 py-3">
                {hemuppgift.type}
                </td>
                <td className="whitespace-nowrap px-3 py-3">
                  {formatDateToLocal(hemuppgift.date)}
                </td>
                <td className="whitespace-nowrap px-3 py-3">
       
                </td>
                <td className="whitespace-nowrap py-3 pl-6 pr-3">
                  <div className="flex justify-end gap-3">
          
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  );
}
