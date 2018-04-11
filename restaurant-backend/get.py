import json
import os
import boto3
import decimalencoder

dynamodb = boto3.resource('dynamodb')


def get(event, context):
    table = dynamodb.Table(os.environ['DYNAMODB_TABLE'])

    # fetch a person from the database
    result = table.get_item(
        Key={
            'RestaurantId': event['pathParameters']['RestaurantId']
        }
    )

    # create a response
    response = {
        "statusCode": 200,
        "body": json.dumps(result['Item'], cls=decimalencoder.DecimalEncoder),
        "headers": {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true"
        }
    }

    return response