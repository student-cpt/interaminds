from flask import request, jsonify, current_app
from bson.json_util import dumps

def get_campaigns():
    try:
        
        mongo = current_app.extensions['pymongo']
        
        query = request.args.get('query', '').strip()  
        category = request.args.get('category', '').strip()  
        date_range = request.args.get('dateRange', '').strip() 
        amount_range = request.args.get('amountRange', '').strip()
        sort = request.args.get('sort', 'relevance')
        filters = {}
        if query:
            filters['name'] = {'$regex': query, '$options': 'i'}
        if category:
            filters['category'] = category
        
        campaigns_query = mongo.db.campaigns.find(filters)

        # Handle sorting
        if sort == 'date':
            campaigns_query = campaigns_query.sort('date', -1) 
        elif sort == 'popularity':
            campaigns_query = campaigns_query.sort('popularity', -1)
        campaigns = dumps(campaigns_query)
        return jsonify(campaigns), 200

    except Exception as e:
        print(f"Error occurred: {e}")
        return jsonify({"error": str(e)}), 500
