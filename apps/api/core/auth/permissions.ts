import { createAccessControl } from "better-auth/plugins/access";
import { defaultStatements as adminStatements, adminAc } from "better-auth/plugins/admin/access";
import { defaultStatements as orgStatements } from "better-auth/plugins/organization/access";

const statement = {
  ...adminStatements,
  ...orgStatements,
  // Domain resources added here as features are built:
  // project: ["create", "read", "update", "delete"],
} as const;

export const ac = createAccessControl(statement);

export const superAdmin = ac.newRole({
  ...adminAc.statements,
});

export const admin = ac.newRole({
  ...adminAc.statements,
});

export const user = ac.newRole({});
