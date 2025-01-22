export const filterJobs = (allJobs, nameDescription, selectedCity, fromHour, toHour) => {
    return allJobs.filter((job) => {
        let matches = true;
        if (
            nameDescription &&
            !job.jobTitle.toLowerCase().includes(nameDescription.toLowerCase()) &&
            !job.jobDescription.toLowerCase().includes(nameDescription.toLowerCase())
        ) {
            matches = false;
        }

        if (selectedCity !== 'Any City' && selectedCity) {
            if (!job.city.toLowerCase().includes(selectedCity.toLowerCase())) {
                matches = false;
            }
        }

        if (fromHour && job.workHours < parseInt(fromHour)) {
            matches = false;
        }
        if (toHour && job.workHours > parseInt(toHour)) {
            matches = false;
        }

        return matches;
    });
};
