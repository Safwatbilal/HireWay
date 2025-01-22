export const authDate = (type, formData) => {
    return async () => {
        const response = await fetch(`https://orderhe-a9147-default-rtdb.firebaseio.com/${type}.json`);
        const data = await response.json();
        for (let key in data) {
            if (data[key].email === formData.email) {
                return "Email is already taken.";
            }
            if (data[key].name === formData.name) {
                return "Name is already taken.";
            }
        }
        await fetch(`https://orderhe-a9147-default-rtdb.firebaseio.com/${type}.json`, {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            },
        });
    };
};

export const fetchLogin = (type) => {
    return async (dispatch) => {
        try {
            const response = await fetch(`https://orderhe-a9147-default-rtdb.firebaseio.com/${type}.json/`);
            if (!response.ok) {
                throw new Error('Failed to fetch users!');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            //   console.error('Error fetching users:', error);
        }
    };
};