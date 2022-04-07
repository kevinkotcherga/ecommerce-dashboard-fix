class Order < ApplicationRecord
  def self.list_of_country
    list_of_country = []
    Order.all.each do |order|
      list_of_country << order.country
    end
    list_of_country.uniq
  end
end
