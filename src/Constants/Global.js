import { useEffect, useState } from "react";

export function getRole() {
    const [role, setRole] = useState('');
      useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
          const parseRole = JSON.parse(user);
          setRole(parseRole.role);
        }
      }, []);
        return role;
    }