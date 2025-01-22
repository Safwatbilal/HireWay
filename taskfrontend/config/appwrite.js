import { Client, Databases, Account, Storage } from "node-appwrite";


const createAdminClient = () => {
    const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT)
        .setKey(process.env.NEXT_APPWRITE_KEY);

    return {
        get account() {
            return new Account(client);
        },
        get databases() {
            return new Databases(client);
        },
        get storage() {
            return new Storage(client);
        },
    };
};


export { createAdminClient };


export const createStorageClient = () => {
    const adminClient = createAdminClient();
    return adminClient.storage;
};
