export class UserValidator {
  static validateAddSuperAdmin(body: any): string | null {
    const { name, userName, password, userType } = body;

    if (!name || !userName || !password || !userType) {
      return 'Name, userName, userType and password are required fields.';
    }

    if (userType !== 'SuperAdmin') {
      return `User type ${userType} is not allowed.`;
    }

    return null;
  }

  static validateRegisterUser(body: any): string | null {
    const { userName, password, userType, school_id } = body;

    if (!userName || !password || !userType) {
      return 'userName, password, and userType are required fields.';
    }

    if (!school_id) {
      return 'School ID not found.';
    }

    return null;
  }

  static validateLoginUser(body: any): string | null {
    const { userName, password, school_id } = body;

    if (!userName || !password) {
      return 'userName and password are required fields.';
    }

    return null;
  }
}
