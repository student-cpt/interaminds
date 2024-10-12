from flask import Blueprint, jsonify, request
from bson import ObjectId
from . import mongo

main = Blueprint('main', __name__)

def serialize_doc(doc):
    """Recursively convert ObjectId fields to strings in a document."""
    if isinstance(doc, ObjectId):
        return str(doc)
    if isinstance(doc, dict):
        return {k: serialize_doc(v) for k, v in doc.items()}
    if isinstance(doc, list):
        return [serialize_doc(item) for item in doc]
    return doc

@main.route('/api/campaigns', methods=['GET'])
def get_campaigns():
    try:

        campaign_name = request.args.get('query', '').strip()
        category = request.args.get('category', '').strip()  
        min_goal = request.args.get('min_goal', '').strip() 
        max_goal = request.args.get('max_goal', '').strip()  

        search_filter = {}
        
        print(f"Searching for campaign with name: '{campaign_name}', category: '{category}', min_goal: '{min_goal}', max_goal: '{max_goal}'")

        if campaign_name:
            search_filter['name'] = {'$regex': campaign_name, '$options': 'i'}

        if category:
            search_filter['category'] = {'$regex': category, '$options': 'i'}

        if min_goal or max_goal:
            goal_filter = {}
            if min_goal:
                goal_filter['$gte'] = int(min_goal)
            if max_goal:
                goal_filter['$lte'] = int(max_goal)
            
            search_filter['goal'] = goal_filter

        campaigns = mongo.db.campaigns.find(search_filter)
        campaigns_list = list(campaigns)

        print(f"Number of campaigns found: {len(campaigns_list)}")

        campaigns_list = [serialize_doc(doc) for doc in campaigns_list]

        return jsonify(campaigns_list), 200
    except Exception as e:
        print(f"Error occurred while fetching campaigns: {e}")
        return jsonify({"error": str(e)}), 500
