// This is a list of tickets for the Web and Mobile tabs with expected values
// Values can be checked against the JSON found on the pages

export const testWebTickets = {
    updateDocumentation:{
        "column": "Done",
        "card":{
        "title": "Update documentation",
        "description": "Add API endpoints documentation",
        "tags": [
          "Feature"
        ],
        "reported": {
          "reportedBy": "Lisa Brown",
          "reportedOn": "3/17/2024"
        },}

    },
    apiIntegration:
      {
        "column": "Review",
        "card":{
        "title": "API integration",
        "description": "Connect to payment gateway",
        "tags": [
          "Feature",
          "High Priority"
        ],
        "reported": {
          "reportedBy": "Mike Johnson",
          "reportedOn": "3/20/2024"
        }
      },
    },
      fixNavigationBug:
      {
        "column":"To Do",
        "card":{
        "title": "Fix navigation bug",
        "description": "Menu does not close on mobile",
        "tags": [
          "Bug"
        ],
        "reported": {
          "reportedBy": "John Smith",
          "reportedOn": "3/19/2024"
        }
      },},
      implementUserAuthentication:
      { 
        "column": "To Do",
        "card":{
        "title": "Implement user authentication",
        "description": "Add login and signup functionality",
        "tags": [
          "Feature",
          "High Priority"
        ],
        "reported": {
          "reportedBy": "Sarah Chen",
          "reportedOn": "3/24/2024"
        },},},

      
      designSystemUpdates:
      {
        "column": "In Progress",
        "card":{
            
                "title": "Design system updates",
                "description": "Update color palette and typography",
                "tags": [
                  "Design"
                ],
                "reported": {
                  "reportedBy": "Emma Wilson",
                  "reportedOn": "3/21/2024"
                }
              },

        }
}

export const testMobileTickets = {
    pushNotificationSystem:
    {
        "column": "To Do",
        "card":
          {
            "title": "Push notification system",
            "description": "Implement push notifications for iOS and Android",
            "tags": [
              "Feature"
            ],
            "reported": {
              "reportedBy": "David Kim",
              "reportedOn": "3/27/2024"
            }
          }
        
      },
      offlineMode:{
        "column": "In Progress",
        "card":
        {
          "title": "Offline mode",
          "description": "Enable offline data synchronization",
          "tags": [
            "Feature",
            "High Priority"
          ],
          "reported": {
            "reportedBy": "Rachel Green",
            "reportedOn": "3/23/2024"
          }
        }
      
    },
    appIconDesign:
    { 
        "column": "Done",
        "card":
      {
        "title": "App icon design",
        "description": "Create app icons for all required sizes",
        "tags": [
          "Design"
        ],
        "reported": {
          "reportedBy": "Emma Wilson",
          "reportedOn": "3/14/2024"
        }
    },
},

}

