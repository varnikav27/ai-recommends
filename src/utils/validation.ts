import type { ValidationResult, ValidationError, UserVibe, TripPlan } from '../types';

// Validation utility functions
export class Validator {
  private errors: ValidationError[] = [];

  private addError(field: string, message: string): void {
    this.errors.push({ field, message });
  }

  private reset(): void {
    this.errors = [];
  }

  // Date validation helpers
  private isValidDate(date: Date | null): boolean {
    return date !== null && date instanceof Date && !isNaN(date.getTime());
  }

  private isFutureDate(date: Date): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date >= today;
  }

  private isEndDateAfterStartDate(startDate: Date, endDate: Date): boolean {
    return endDate > startDate;
  }

  private getDaysDifference(startDate: Date, endDate: Date): number {
    const timeDifference = endDate.getTime() - startDate.getTime();
    return Math.ceil(timeDifference / (1000 * 3600 * 24));
  }

  // String validation helpers
  private isValidString(value: string, minLength: number = 1): boolean {
    return typeof value === 'string' && value.trim().length >= minLength;
  }

  private isValidCountry(destination: string): boolean {
    // Basic validation - could be enhanced with a country list
    const validPattern = /^[a-zA-Z\s,.-]+$/;
    return this.isValidString(destination, 2) && validPattern.test(destination);
  }

  // Age validation
  private isValidAge(age: number): boolean {
    return typeof age === 'number' && age >= 1 && age <= 120;
  }

  // Validate User Vibe
  validateUserVibe(userVibe: UserVibe): ValidationResult {
    this.reset();

    if (!this.isValidAge(userVibe.age)) {
      this.addError('age', 'Please enter a valid age between 1 and 120');
    }

    if (!userVibe.gender || !['male', 'female', 'other'].includes(userVibe.gender)) {
      this.addError('gender', 'Please select a gender');
    }

    if (!userVibe.preferredDestinationType) {
      this.addError('preferredDestinationType', 'Please select a preferred destination type');
    }

    return {
      isValid: this.errors.length === 0,
      errors: [...this.errors]
    };
  }

  // Validate Trip Plan
  validateTripPlan(tripPlan: TripPlan): ValidationResult {
    this.reset();

    // Destination validation
    if (!this.isValidCountry(tripPlan.destination)) {
      this.addError('destination', 'Please enter a valid destination (letters, spaces, and basic punctuation only)');
    }

    // From location validation
    if (!this.isValidString(tripPlan.fromLocation, 2)) {
      this.addError('fromLocation', 'Please select or enter a valid departure location');
    }

    // Start date validation
    if (!this.isValidDate(tripPlan.startDate)) {
      this.addError('startDate', 'Please select a valid start date');
    } else if (!this.isFutureDate(tripPlan.startDate!)) {
      this.addError('startDate', 'Start date must be today or in the future');
    }

    // End date validation
    if (!this.isValidDate(tripPlan.endDate)) {
      this.addError('endDate', 'Please select a valid end date');
    } else if (this.isValidDate(tripPlan.startDate) && !this.isEndDateAfterStartDate(tripPlan.startDate!, tripPlan.endDate!)) {
      this.addError('endDate', 'End date must be after start date');
    }

    // Trip duration validation
    if (this.isValidDate(tripPlan.startDate) && this.isValidDate(tripPlan.endDate)) {
      const duration = this.getDaysDifference(tripPlan.startDate!, tripPlan.endDate!);
      if (duration > 365) {
        this.addError('endDate', 'Trip duration cannot exceed 365 days');
      }
    }

    // Companions validation
    if (!tripPlan.companions || !['solo', 'partner', 'family', 'friends'].includes(tripPlan.companions)) {
      this.addError('companions', 'Please select who you\'re traveling with');
    }

    // Vibes validation
    if (!tripPlan.vibes || tripPlan.vibes.length === 0) {
      this.addError('vibes', 'Please select at least one travel vibe');
    } else if (tripPlan.vibes.length > 5) {
      this.addError('vibes', 'Please select maximum 5 travel vibes');
    }

    return {
      isValid: this.errors.length === 0,
      errors: [...this.errors]
    };
  }

  // Validate specific fields
  validateDestination(destination: string): ValidationResult {
    this.reset();
    
    if (!this.isValidCountry(destination)) {
      this.addError('destination', 'Please enter a valid destination');
    }

    return {
      isValid: this.errors.length === 0,
      errors: [...this.errors]
    };
  }

  validateDateRange(startDate: Date | null, endDate: Date | null): ValidationResult {
    this.reset();

    if (!this.isValidDate(startDate)) {
      this.addError('startDate', 'Please select a valid start date');
    } else if (!this.isFutureDate(startDate!)) {
      this.addError('startDate', 'Start date must be today or in the future');
    }

    if (!this.isValidDate(endDate)) {
      this.addError('endDate', 'Please select a valid end date');
    } else if (this.isValidDate(startDate) && !this.isEndDateAfterStartDate(startDate!, endDate!)) {
      this.addError('endDate', 'End date must be after start date');
    }

    return {
      isValid: this.errors.length === 0,
      errors: [...this.errors]
    };
  }
}

// Create a singleton instance
export const validator = new Validator();

// Helper functions for common validations
export const validateRequired = (value: any, fieldName: string): ValidationError | null => {
  if (!value || (typeof value === 'string' && value.trim() === '')) {
    return { field: fieldName, message: `${fieldName} is required` };
  }
  return null;
};

export const validateMinLength = (value: string, minLength: number, fieldName: string): ValidationError | null => {
  if (value && value.length < minLength) {
    return { field: fieldName, message: `${fieldName} must be at least ${minLength} characters` };
  }
  return null;
};

export const validateMaxLength = (value: string, maxLength: number, fieldName: string): ValidationError | null => {
  if (value && value.length > maxLength) {
    return { field: fieldName, message: `${fieldName} must not exceed ${maxLength} characters` };
  }
  return null;
};
