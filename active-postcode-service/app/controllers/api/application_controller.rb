class Api::ApplicationController < ApplicationController
	respond_to :json

	def json_success(status, message)
    	@status = status
    	@message = message
  	end

  	def json_blank(status, message)
    	@status = status
    	@message = message
    	render "/api/shared/blank", :status => status
  end


end
