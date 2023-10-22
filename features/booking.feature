Feature: Booking tickets

  Scenario: Successfully booking a single seat
    Given I am on the booking page
    When I select a single seat
    And I proceed to checkout
    Then I should see the confirmation page

  Scenario: Successfully booking two seats
    Given I am on the booking page
    When I select two seats
    And I proceed to checkout
    Then I should see the confirmation page

  Scenario: Attempting to proceed without selecting a seat
    Given I am on the booking page
    When I proceed to checkout without selecting a seat
    Then I should see an error message
