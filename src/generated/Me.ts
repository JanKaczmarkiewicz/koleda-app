/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Role } from "./globalTypes";

// ====================================================
// GraphQL query operation: Me
// ====================================================

export interface Me_me {
  username: string;
  confirmed: boolean;
  email: string;
  id: string;
  role: Role;
}

export interface Me {
  me: Me_me;
}
