class HomeControllerController < ApplicationController

	def index
    @states = State.all
		render 'home_controller/index'
	end

	def getPostCode
		@postcode = PostCode.all
		render json: @postcode
	end

	def getSuburb
		@suburb = Suburb.all
		render json: @suburb
	end

  def getStates
    @states = State.all.select(:id, :name)
    render json: @states
  end

  def getSuburbByStateId
    state_id = params[:stateId]
    if (state_id != "")
      @suburb = Suburb.where state_id: state_id
    else
      @suburb = Suburb.all
    end
    render json: @suburb
  end

	def getPostCodeId
		suburb = params[:suburb]
		if suburb.try(:to_i) == 0
			suburb = Suburb.find_by(name: params[:suburb])
			@code = suburb.post_code.poa_code
		else
			@code = suburb
		end
		render json: @code
	end

  def getPostCodeByStateId
    state_id = params[:stateId]    
    @code = Array.new
    suburbs = Suburb.all
    
    if (state_id != "")
      suburbs = Suburb.where state_id: state_id
    end

    suburbs.each do |c|
      @code.push(c.post_code)
    end
    render json: @code.uniq
  end

end