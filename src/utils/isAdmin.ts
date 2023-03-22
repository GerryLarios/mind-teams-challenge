export default function isAdmin({
  isAdmin,
  isSuperAdmin,
}: {
  isAdmin?: boolean;
  isSuperAdmin?: boolean;
}) {
  return isAdmin || isSuperAdmin;
}
