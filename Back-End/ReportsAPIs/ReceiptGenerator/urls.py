from django.conf.urls import url
from ReceiptGenerator import views

urlpatterns = [
    url(r'^api/v1/receipt-generator$', views.receipt_list),
    url(r'^api/v1/receipt-generator/(?P<pk>[0-9]+)$', views.receipt_detail),
    url(r'^api/v1/receipt-generator/concept$', views.concepts_list)
]
