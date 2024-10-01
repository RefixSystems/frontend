import { useEffect, useState } from "react";

export function getEmail() {
    const [Email, setEmail] = useState('');
      useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
          const parseEmail = JSON.parse(user);
          setEmail(parseEmail.email);
        }
      }, []);
        return Email;
    }