export function getPersonById(state, personId) {
    var person = state.people.find(p => p.id === personId)
    return person
}
export function getPersonJobsById(state, personId) {
    var jobs = state.personJobs.filter(job => job.personId === personId)
    return jobs.sort((e1, e2) => e1.start < e2.start)
}