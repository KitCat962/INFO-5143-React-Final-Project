// Hook because why not
// it does no work, but it means I do not have to remember this after writing it once
// Also means that if I decide to move this data to firestore, I dont have to change any component functionality
export default function useProvinces() {
    return {
        on: 'Ontario',
        qc: 'Quebec',
        ns: 'Nova Scotia',
        nb: 'New Brunswick',
        mb: 'Manitoba',
        bc: 'British Columbia',
        pe: 'Prince Edward Island',
        sk: 'Saskaatchewan',
        ab: 'Alberta',
        nl: 'Newfoundland and Labrador',
    }
}
