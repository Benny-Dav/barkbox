import { faCalendar, faClock, faPeopleGroup, faShower, faStethoscope, faVideo, faShieldDog } from "@fortawesome/free-solid-svg-icons";

 const F = {
    FEATURES : [
        {
            icon:faCalendar,
            title:"Schedule for a convenient day",
            description:"Minimize the time it takes for patients to schedule an appointment. Enable easy online self-booking with your specialists."

        },
        {
            icon:faPeopleGroup,
            title:"View Available Staff",
            description:"Add individual profiles for your practice’s doctors. Direct patients to the appropriate consultant and streamline booking."

        },
        {
            icon:faClock,
            title:"Avoid missed appointments",
            description:"Automate text and email reminders for every booking. Patients can also reschedule directly from their confirmations."

        },
        {
            icon:faVideo,
            title:"Schedule video calls ",
            description:"Book and host video appointments to reach patients where they’re comfortable. Your Setmore app connects with Google Meet."
        }
    ],
    SERVICES:[
        {
            icon:faStethoscope,
            title:"Veterinarians",
            description:"Leading you to the most qualified veterinarians.",
            url: "/vetservices"

        },
        {
            icon:faShower,
            title:"Groomers",
            description:"Get your dogs cleaned up and ready for the day.",
            url: "/vetservices"

        },
        {
            icon:faShieldDog,
            title:"Trainers",
            description:"Train your dogs to be the best they can be.",
            url: "/vetservices"

        }

    ]
}

export default F;