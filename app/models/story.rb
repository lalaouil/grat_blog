class Story < ActiveRecord::Base
# attr_accessor :keywords
#   @@alchemy_url ||= ENV["ALCHEMY_URL"]

#   def get_keywords
#     res = Typhoeus.get(@@alchemy_url, params: {
#       apikey: ENV["ALCHEMY_APIKEY"],
#       text: content,
#       maxRetrieve: 10,
#       outputMode: "json"
#     })
#     words = JSON.parse(res.body)["keywords"].map do |w|
#       w['text']
#     end
#     @keywords = words.join(" | ")
#   end


  private
def post_to_facebook
    if story.is_a?(User) && story.oauth_token.present?
        graph = Koala::Facebook::API.new(story.oauth_token)
        graph.put_connections("me", "feed", message: "TODO: #{content}")
    end
end
end
