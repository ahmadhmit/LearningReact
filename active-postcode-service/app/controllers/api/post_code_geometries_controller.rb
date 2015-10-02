class Api::PostCodeGeometriesController < Api::ApplicationController
	include PolygonsService
	require 'json'

	def show
		#geometries = PolygonsService.get_polygon_by_post_code params[:id]
		
		
		
		postcode = PostCode.find_by(poa_code: params[:id])
		polygon = Polygon.where(post_code_id: postcode.id)
		
		arrayGeometries = []
		for i in 0..polygon.length-1
			
			arrayCoor = []
			coord = Coordinate.where(polygon_id: polygon[i].id)
			for j in 0..coord.length-1
				
				arrayCoor.push([coord[j].longitude, coord[j].latitude])
			end
			arrayGeometries.push(arrayCoor)
		end
		

		#geometries = polygon.vertexs
		render json: arrayGeometries
	end
end																										