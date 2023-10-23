Feature: Booking tickets

  Background: 
    Given I am on the booking page
    And I select a movie session

  Scenario: Successfully booking a single seat
    When I choose "1" seat
    And I proceed to checkout
    Then I should see the confirmation message

  Scenario: Successfully booking two seats
    When I choose "2" seats
    And I proceed to checkout
    Then I should see the confirmation message

  Scenario: Attempting to proceed without selecting a seat
    Then the checkout button should be disabled



