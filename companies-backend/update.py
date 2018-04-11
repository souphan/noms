import json
import os
import time
import uuid
import boto3
import decimalencoder

dynamodb = boto3.resource('dynamodb')


def update(event, context):
    data = json.loads(event['body'])

    timestamp = int(time.time() * 1000)

    ## Creating a table inside DynamoDB
    table = dynamodb.Table(os.environ['DYNAMODB_TABLE'])


    ## Items to populate the table
    item = {
        'CompanyId': str(uuid.uuid1()),
        'restaurantFood': data['restaurantFood'],
        'restaurantName': data['restaurantName'],
        'restaurantTime': data['restaurantTime'],
        'restaurantImage': data['restaurantImage'],
        'createdAt': timestamp,
        'updatedAt': timestamp
    }


    # write the item to the database
    table.update_item(
        Key={
            'CompanyId': '1'
        },
        UpdateExpression='SET CompanyAge = :val',
        ExpressionAttributeValues={
            ':val': '30'
        }
    )
    # create a response
    response = {
        "statusCode": 200,
        "body": json.dumps(item),
        "headers": {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": "true"
        }
    }

    return response