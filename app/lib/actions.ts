'use server';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
 
 
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}



const FormSchema = z.object({
    id: z.string(),
    customerId: z.string({
      invalid_type_error: 'Please select a customer.',
    }),
    amount: z.coerce.number()   .gt(0, { message: 'Please enter an amount greater than $0.' }),
    status: z.enum(['pending', 'paid'], {
      invalid_type_error: 'Please select an invoice status.',
    }),
    date: z.string(),
  });
   
  const CreateInvoice = FormSchema.omit({ id: true, date: true });

  export type State = {
    errors?: {
      customerId?: string[];
      amount?: string[];
      status?: string[];
    };
    message?: string | null;
  };



  

  export async function createInvoice(prevState: State, formData: FormData) {
    // Validate form using Zod
    const validatedFields = CreateInvoice.safeParse({
      customerId: formData.get('customerId'),
      amount: formData.get('amount'),
      status: formData.get('status'),
    });
   
    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Create Invoice.',
      };
    }
   
    // Prepare data for insertion into the database
    const { customerId, amount, status } = validatedFields.data;
    const amountInCents = amount * 100;
    const date = new Date().toISOString().split('T')[0];
   
    // Insert data into the database
    try {
      await sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
      `;
    } catch (error) {
      // If a database error occurs, return a more specific error.
      return {
        message: 'Database Error: Failed to Create Invoice.',
      };
    }
   
    // Revalidate the cache for the invoices page and redirect the user.
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
  }



  const FormSchema2 = z.object({
    type: z.string({
      invalid_type_error: 'Välj vilken typ av hemuppgift du försöker lägga till.',
    }),
    title: z.string({
      invalid_type_error: 'Din hemuppgift måste ha ett namn.',
    }).min(1, { message: 'Din hemuppgift måste ha ett namn.' }),

     link: z.string({
      invalid_type_error: 'Du måste lägga till en länk till hemuppgiften.',
    }).min(1, { message: 'Du måste lägga till en länk till hemuppgiften.' }),
    besk: z.string({
      invalid_type_error: 'Du måste lägga till en kort beskrivning av hemuppgiften.',
    }).min(1, { message: 'Du måste lägga till en kort beskrivning av hemuppgiften.' }),
    date: z.string(),
  });
   
  const CreateHemuppgift = FormSchema2.omit({ id: true, date: true });

  export type State2 = {
    errors?: {
      type?: string[];
      title?: string[];
      link?: string[];
      besk?: string[];
    };
    messagedup?: string | null;
    message?: string | null;
  };

  export async function createHemuppgift(prevState: State2, formData: FormData) {
    // Validate form using Zod
    const validatedFieldsHemuppgift = CreateHemuppgift.safeParse({
      type: formData.get('type'),
      title: formData.get('title'),
      link: formData.get('link'),
      besk: formData.get('besk'),
    });
   
   
    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFieldsHemuppgift.success) {
      return {
        errors: validatedFieldsHemuppgift.error.flatten().fieldErrors,
        message: 'Du verkar ha missat att fylla i något, vi kunde inte lägga till hemuppgiften.',
      };
    }
   

  // Prepare data for insertion into the database
  const { type, title, link, besk} = validatedFieldsHemuppgift.data;
    const date = new Date().toISOString().split('T')[0];
   
   
    // Insert data into the database
    try {
      await sql`
        INSERT INTO hemuppgifter (title, type, besk, link, date)
        VALUES (${title}, ${type}, ${besk}, ${link}, ${date})
        `;
    } catch (error) {
      // If a database error occurs, return a more specific error.
      if(error.code==="23505")return{ messagedup: 'Det finns redan en hemuppgift med detta namn, välj ett annat'}
      return {
     
        message: 'Database Error: Failed to Create Invoice.',
      };
    }
   
    // Revalidate the cache for the invoices page and redirect the user.
    revalidatePath('/hemuppgifter');
    redirect('/hemuppgifter');
  }



  const UpdateInvoice = FormSchema.omit({ id: true, date: true });
 
// ...
 
export async function updateInvoice(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
 
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Invoice.',
    };
  }
 
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
 
  try {
    await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Invoice.' };
  }
 
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}
  export async function deleteInvoice(id: string) {
    throw new Error('Failed to Delete Invoice');
    try {
      await sql`DELETE FROM invoices WHERE id = ${id}`;
      revalidatePath('/dashboard/invoices');
      return { message: 'Deleted Invoice.' };
    } catch (error) {
      return { message: 'Database Error: Failed to Delete Invoice.' };
    }
  }


