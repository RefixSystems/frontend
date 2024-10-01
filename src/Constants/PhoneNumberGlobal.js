import { useEffect, useState } from "react";

export function getPhoneNumber() {
    const [PhoneNumber, setPhoneNumber] = useState('');
      useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
          const parsePhoneNumber = JSON.parse(user);
          setPhoneNumber(parsePhoneNumber.phoneNumber);
        }
      }, []);
        return PhoneNumber;
    }

   