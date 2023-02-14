export const rolesMap = {
  ROLE_ADMINISTRATOR: "Administrator",
  ROLE_ACCOUNTANT: "Accountant",
  ROLE_USER: "User",
  ROLE_AUDITOR: "Auditor"
};

export const rolesRequestRepresenatation = {
  ROLE_ADMINISTRATOR: "ADMINISTRATOR",
  ROLE_ACCOUNTANT: "ACCOUNTANT",
  ROLE_USER: "USER",
  ROLE_AUDITOR: "AUDITOR"
}

export const allRoles = new Set(["ROLE_ADMINISTRATOR", "ROLE_ACCOUNTANT", "ROLE_USER", "ROLE_AUDITOR"]);

export const rolesPagesMap = {
  ROLE_ADMINISTRATOR: { name: "ADMIN CONTENT", link: "/admin" },
  ROLE_ACCOUNTANT: { name: "ACCOUNTANT CONTENT", link: "/accountant" },
  ROLE_AUDITOR: {name: "AUDITOR CONTENT", link: "/auditor"}
};

export const monthFormat = "MM-YYYY";