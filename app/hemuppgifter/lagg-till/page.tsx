import Form from '@/app/ui/hemuppgifter/create-form-hemuppgifter';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCustomers } from '@/app/lib/data';
 
export default async function Page() {
  const customers = await fetchCustomers();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Hemuppgifter', href: '/Hemuppgifter' },
          {
            label: 'Lägg till hemuppgift',
            href: '/Hemuppgifter/lagg-till',
            active: true,
          },
        ]}
      />
      <Form customers={customers} />
    </main>
  );
}