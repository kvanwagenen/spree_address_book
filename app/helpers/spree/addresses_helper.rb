module Spree::AddressesHelper
  def address_field(form, method, id_prefix = "b", &handler)
    id_prefix = id_prefix == 'bill_address' ? 'b' : 's'
    if handler
      handler.call
    else
      is_required = Spree::Address.required_fields.include?(method)
      form.text_field(method, :class => "form-control" + (is_required ? ' required' : ''), :placeholder => t(method, :scope => [:activerecord, :attributes, 'spree/address']))
    end
  end

  def address_state(form, country)
    country ||= Spree::Country.find(Spree::Config[:default_country_id])
    have_states = !country.states.empty?
    state_elements = [
      form.collection_select(:state_id, country.states.order(:name),
                            :id, :name,
                            {:include_blank => "State (required)"},
                            {:class => have_states ? "required" : "hidden",
                            :disabled => !have_states}) +
      form.text_field(:state_name,
                      :class => !have_states ? "required" : "hidden",
                      :disabled => have_states)
      ].join.gsub('"', "'").gsub("\n", "")

    #form.label(:state, t(:state)) + '<span class="req">*</span><br />'.html_safe +
    content_tag(:noscript, form.text_field(:state_name, :class => 'required')) +
      javascript_tag("document.write(\"#{state_elements.html_safe}\");")
  end
end
