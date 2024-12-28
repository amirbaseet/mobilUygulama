export  default function calculateAgeInMonths(dateOfBirth) {

    const dob = new Date(dateOfBirth); // Convert dateOfBirth to a Date object
    const currentDate = new Date(); // Use current date or replace with a specific date if needed
  
    // Calculate the year and month difference
    const yearsDifference = currentDate.getFullYear() - dob.getFullYear();
    const monthsDifference = currentDate.getMonth() - dob.getMonth();
    const daysDiffrence = currentDate.getDay() - dob.getDay();
    // Total months
    const totalMonths = (yearsDifference * 12) + monthsDifference;
  
    // Adjust for days if the current day is before the birth day
    if (currentDate.getDate() < dob.getDate()) {
      return totalMonths - 1;
    }
    if(totalMonths == 0 && daysDiffrence != 0){
      return 1;
    }
  
    return totalMonths;
  }
  export function adultsByMonths(patientAgeMonths){
    //if the patient is adult returning the months to 192 due to make it easier to make the sql query  
    // becaues all of the adults the min age is 192 and the max age was null in the tables so i assigned it to 0
    
    if(patientAgeMonths>=192)
        {
          //  Patient is an adult, returning 192 months.
            return 192;
        }
    else
    //Patient is not an adult, returning actual age in months.
    return patientAgeMonths;
  }