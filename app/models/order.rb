# frozen_string_literal: true

# app/models/order.rb
class Order < ApplicationRecord
  def self.revenue
    sum("quantity * unit_price").round(2)
  end

  def self.average_revenue_per_order
    (revenue / distinct.count(:order_id)).round(2)
  end

  def self.list_of_country
    distinct(:country)
  end

  def self.customers
    customers = []
    all.each do |customer|
      customers << customer.customer_id
    end
    customers.uniq.count
  end

  def self.list_of_country_sql
    sql = <<-SQL
      SELECT DISTINCT(country) FROM orders
    SQL
    ActiveRecord::Base.connection.execute(sql).to_a.map do |country_row|
      country_row['country']
    end
  end

  def self.revenue_sql
    sql = <<-SQL
    SELECT SUM(unit_price * quantity) FROM orders
    SQL
    ActiveRecord::Base.connection.execute(sql).to_a.map do |revenue_row|
      revenue_row['sum'].round(2)
    end
  end

  def self.average_revenu_per_order_sql
    sql = <<-SQL
     SELECT DISTINCT(order_id).count FROM orders
    SQL
    ActiveRecord::Base.connection.execute(sql).to_a.map do |average|
      average
    end
  end
end
