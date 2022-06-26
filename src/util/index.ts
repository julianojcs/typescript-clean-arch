export const transformPhone = (phone: string | null): string | null => {
  return phone ? phone.replace(/[^0-9]/g, '') : null;
}

export const transformName = (name: string): string => {
  return name.split(" ").map((s) => {
    return s.length > 2 ? s[0].toUpperCase() + s.slice(1).toLowerCase() : s.toLowerCase()
  }).join(" ");
}

export const transformEmail = (email: string | null): string | null => {
  return email ? email.toLowerCase() : null;
}