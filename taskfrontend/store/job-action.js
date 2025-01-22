export const jobDate = (formdate) => {
    const companyId = localStorage.getItem('companyId');
    if (!companyId) {
        // console.error('Company ID not found in localStorage!');
        return;
    }
    const updatedFormdate = { ...formdate, companyId };
    return async () => {
        const authDate = async () => {
            try {
                const response = await fetch(
                    `https://orderhe-a9147-default-rtdb.firebaseio.com/job.json`,
                    {
                        method: 'POST',
                        body: JSON.stringify(updatedFormdate),
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );
                if (!response.ok) {
                    throw new Error('Failed to post job data!');
                }

                //  console.log('Job data posted successfully.');
            } catch (error) {
                throw new Error('Failed to post job data!');
                // console.error('Error posting job data:', error);
            }
        };
        await authDate();
    };
};

export const fetchJobsByCompanyId = (companyId) => {
    // console.log(companyId);
    return async (dispatch) => {
        try {
            const response = await fetch(`https://orderhe-a9147-default-rtdb.firebaseio.com/job.json`);

            if (!response.ok) {
                throw new Error('Failed to fetch jobs!');
            }

            const data = await response.json();
            if (companyId === 0) return Array.isArray(data) ? data : Object.values(data);

            if (data) {
                const filteredJobs = Object.keys(data)
                    .filter((key) => data[key].companyId === companyId)
                    .map((key) => data[key]);

                return filteredJobs;
            } else {
                return [];
            }
        } catch (error) {
            throw new Error('Failed to post job data!');
        }
    };
};






















///////////////////////////////////////////////////
// export const fetchJobsByUserId = (userId) => {
//     //console.log(companyId);
//     return async (dispatch) => {
//         try {
//             const response = await fetch(`https://orderhe-a9147-default-rtdb.firebaseio.com/applyJob.json`);

//             if (!response.ok) {
//                 throw new Error('Failed to fetch jobs!');
//             }

//             const data = await response.json();
//             if (data) {
//                 const filteredJobs = Object.keys(data)
//                     .filter((key) => data[key].userID === userId)
//                     .map((key) => data[key]);

//                 return filteredJobs;
//             } else {
//                 return [];
//             }
//         } catch (error) {
//             console.error('Error fetching jobs:', error);
//             return [];
//         }
//     };
// };