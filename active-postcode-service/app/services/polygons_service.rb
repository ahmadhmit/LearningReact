module PolygonsService
	require 'json'
	
	def self.get_polygon_by_post_code(post_code)
		@@polygons ||= File.read("#{Rails.root}/app/assets/data/postcode_boundaries.json")
		polygons_hashed = JSON.parse(@@polygons)

		polygon_features = polygons_hashed["features"]

		post_code_geometry = {}
			
		post_code_geometry = polygon_features.select {|f| f["properties"]["POA_2006"] ==  post_code ? f["geometry"] : "" }
		#polygon_features.each do | f |

		#	post_code_geometry = f["geometry"]
		#	break if f["properties"]["POA_2006"] == post_code
		#end
		result = post_code_geometry

	end
end