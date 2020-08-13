from django.core.serializers import serialize
from django.core.serializers.json import DjangoJSONEncoder
from django.shortcuts import render

# Create your views here.

from django.http.response import JsonResponse
from django.core import serializers
from rest_framework.parsers import JSONParser
from rest_framework import status

from ReceiptGenerator.models import Receipt, Concept
from ReceiptGenerator.serializers import ReceiptSerializer, ReceiptSerializerRequest
from rest_framework.decorators import api_view


@api_view(['GET', 'POST', 'DELETE'])
def receipt_list(request):
    if request.method == 'GET':
        receipts = Receipt.objects.all()
        title = request.GET.get('title', None)
        if title is not None:
            receipts = receipts.filter(title__icontains=title)
        receipts_serializer = ReceiptSerializer(receipts, many=True)
        return JsonResponse(receipts_serializer.data, safe=False)
        # 'safe=False' for objects serialization

    elif request.method == 'POST':
        receipt_data = JSONParser().parse(request)
        receipt_serializer = ReceiptSerializerRequest(data=receipt_data)
        print(receipt_serializer)

        if receipt_serializer.is_valid():
            receipt_serializer.save()
            return JsonResponse(receipt_serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(receipt_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        count = Receipt.objects.all().delete()
        return JsonResponse({'message': '{} Receipts were deleted successfully!'.format(count[0])},
                            status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'PUT', 'DELETE'])
def receipt_detail(request, pk):
    try:
        receipt = Receipt.objects.get(pk=pk)
    except Receipt.DoesNotExist:
        return JsonResponse({'message': 'The receipt does not exist'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        receipt_serializer = ReceiptSerializer(receipt)
        return JsonResponse(receipt_serializer.data)

    elif request.method == 'PUT':
        receipt_data = JSONParser().parse(request)
        receipt_serializer = ReceiptSerializerRequest(receipt, data=receipt_data)
        if receipt_serializer.is_valid():
            receipt_serializer.save()
            return JsonResponse(receipt_serializer.data)
        return JsonResponse(receipt_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        receipt.delete()
        return JsonResponse({'message': 'Receipt was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)
