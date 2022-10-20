from hashlib import new
from django.shortcuts import render
from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import JSONParser
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate, login, logout
from rest_framework.permissions import IsAuthenticated
from django.core import serializers as core_serializers
import datetime
from datetime import date
from datetime import timedelta
import math

from . models import *
from . serializer import *

class apicreation(APIView):
    def post(self, request):
        react_data = JSONParser().parse(request)
        serializer = ReactSerializer(data=react_data)
        if serializer.is_valid(raise_exception=True):
            try:
                email = serializer.validated_data['email']
                number = serializer.validated_data['number']
                password = serializer.validated_data['password']
                name = serializer.validated_data['name']
                use = Users.objects.create_user(email, name, number, password)
                use.save()
                return JsonResponse("success", safe=False)
            except:
                return JsonResponse("fail", safe=False)
        else:
            return JsonResponse("fail", safe=False)
    def get(self, request):
        return JsonResponse("ok", safe=False)

class apilogin(APIView):
    def post(self, request):
        react_data = JSONParser().parse(request)
        email = react_data['email']
        password = react_data['password']
        user = authenticate(request, email = email, password = password)
        if user is not None:
            content = {
                'user' : str(user),
                'auth' : 'None'
            }
            return Response(content)
        else:
            content = {
                'user' : 'None',
                'auth' : 'None'
            }
            return Response(content)
    def get(self, request):
        return JsonResponse("ok",safe=False)

#homepage
class apihomepage(APIView):
    permission_classes = (IsAuthenticated,)
    print("apihomepage")
    def get(self, request, id):
        # try:
            quitplan = QuitPlan.objects.filter(userid = id)
            content = []
            for i in quitplan:
                temp = {}
                # calendar = Calendar.objects.filter(userid = id).filter(planid = i.planid).order_by('date')
                # cal = Calendar.objects.filter(userid = id).filter(planid = i.planid).get()
                cal = Calendar.objects.filter(userid = id).filter(planid = i.pk)
                # print("Showing calendar")
                # print(cal)


                if not cal:
                    temp_dateArray = {"": ""}
                else:
                    cal = cal.get()
                    # print(cal.datearray)
                    temp_dateArray = cal.datearray;
                    
                
                # calendar2 = {}
                # calendar3 = []
                # for items in calendar:
                #     calendar2[str(items.date)] = items.color
                #     calendar3.append(calendar2)                 # is there any use for this?
                
                # temp['id'] = i.planid
                temp['id'] = i.pk
                temp['type'] = i.addiction_type
                temp['datearray'] = temp_dateArray
                temp['streak'] = i.streak
                temp['amt_saved'] = round(i.amt_saved, 2)
                diff = date.today() - i.start_day
                rate = i.days_succeed / diff.days
                temp['success_rate'] = round(rate, 2)

                # if yesterday was a failure, reset streak
                yesterday = date.today() - timedelta(days = 1)
                if yesterday in temp_dateArray.keys():
                    if temp_dateArray[yesterday] == 'transparent':
                        if (date.today() in temp_dateArray.keys() and temp_dateArray[date.today()] != 'green'):
                            print("Resetting streak 1")
                            temp['streak'] = 0
                            i.streak = 0
                            i.save()
                        
                else:
                    if (date.today() in temp_dateArray.keys() and temp_dateArray[date.today()] != 'green'):
                        print("Resetting streak 2")
                        temp['streak'] = 0
                        i.streak = 0
                        i.save()


                content.append(temp)
            # print(content)
            return Response(content)
        # except:
        #     content = {}
        #     content['datearray'] = []
        #     content['streak'] = 0
        #     content['amt_saved'] = 0
        #     content['success_rate'] = 0
        #     return Response(content)


    def post(self, request, id):
        data = JSONParser().parse(request)
        print("Data is")
        print(data)
        try:
            cal = Calendar.objects.filter(userid = id).filter(planid = data['planid']).get() 
            plan = QuitPlan.objects.get(userid=id, pk=data['planid'])
            cal.datearray[data['date']] = data['color']
            

            if (data['color'] == 'green'):
                plan.streak += 1
                plan.days_succeed += 1 
                plan.amt_saved += (plan.amt_spent_weekly/7)


            elif (data['color'] == 'transparent'):
                plan.streak = max(0, (plan.streak - 1))
                plan.days_succeed -= 1
                plan.amt_saved -= (plan.amt_spent_weekly/7)

            print("New plan: ")
            print(plan)
            cal.save()
            plan.save()
            print(plan.streak)
            return JsonResponse("updated successfully", safe=False)

        except Exception as e:
            print("Updating homepage error: ")
            print(str(e))
            return JsonResponse("new day unsuccessful", safe=False)

#profile
class apiprofile(APIView):
    permission_classes = (IsAuthenticated,)
    print('profile')
    def get(self, request, id):
        profile = Users.objects.get(id = id)
        content = {}
        content['name'] = profile.name
        content['email'] = profile.email
        content['number'] = profile.number
        return Response(content)

class editprofile(APIView):
    def get(self, request, id):
        profile = Users.objects.get(id = id)
        content = {}
        content['name'] = profile.name
        content['email'] = profile.email
        content['number'] = profile.number
        print(content)
        return Response(content)
    def post(self, request, id):
        data = JSONParser().parse(request)
        print(data)
        try:
            profile = Users.objects.get(id=id)
            if data['name'] is not "":
                profile.name = data['name']
            if data['number'] is not "":
                profile.number = data['number']
            if data['email'] is not "":
                profile.email = data['email']
            profile.save()
            return JsonResponse("success", safe=False)
        except:
            return JsonResponse("fail", safe=False)


#plan
class createplan(APIView):
    permission_classes = (IsAuthenticated,)
    print('create plan')
    def post(self, request, id):
        react_data = JSONParser().parse(request)
        addiction_type = react_data['addiction_type']
        how_often = react_data['how_often']
        start_day = react_data['start_day']
        buddy = react_data['buddy']
        amt_spent_weekly = react_data['amt_spent_weekly']
        reason_to_quit = react_data['reason_to_quit']
        priority = react_data['priority']
        commit_duration = datetime.timedelta(weeks = int(react_data['commit_duration'])*4)
        streak = 0
        amt_saved = 0.0
        days_succeed = 0

        q1 = Users.objects.get(id = id)
        planid = QuitPlan.objects.all().count() + 1
        print(planid)

        try:
            print("trying...")
            plan = QuitPlan(userid = id, addiction_type = addiction_type,
                            how_often = how_often, start_day = start_day, buddy = buddy,
                            amt_spent_weekly = amt_spent_weekly, reason_to_quit = reason_to_quit,
                            priority = priority, commit_duration = commit_duration, streak = streak,
                            amt_saved = amt_saved, days_succeed = days_succeed)
            plan.save()
            print("Plan pk =")
            print(plan.pk)
            calendar = Calendar(userid = id, planid = plan.pk, datearray={"": ""})
            calendar.save()
            return JsonResponse("success", safe=False)
        except Exception as e:
            print("Something failed")
            print("Exception: " + str(e))
            return JsonResponse("fail", safe=False)



class viewplan(APIView):
    permission_classes = (IsAuthenticated,)
    print("view plan")


    def get(self, request, id):
        plans = QuitPlan.objects.filter(userid = id)
        print("Plans")
        print(plans)
        plans_serializer = QuitPlanSerializer(plans, many=True)
        return JsonResponse(plans_serializer.data, safe=False)


    def delete(self, request, id):
        plan_data = JSONParser().parse(request)
        print(plan_data)
        try:
            # dePlan = QuitPlan.objects.filter(userid = id).get(planid = plan_data['planid'])
            dePlan = QuitPlan.objects.filter(userid = id).get(pk = plan_data['pk'])
            dePlan.delete()
            return JsonResponse("success", safe=False)
        except:
            return JsonResponse("fail",safe=False)



class updateplan(APIView):
    def get(self, request, id, planid):
        # plans = QuitPlan.objects.filter(userid = id).get(planid = planid)
        plans = QuitPlan.objects.filter(userid = id).get(pk = planid)
        plans_serializer = QuitPlanSerializer(plans, many=True)
        return JsonResponse(plans_serializer.data, safe=False)
    def post(self, request, id, planid):
        plan_data = JSONParser().parse(request)
        try:
            # plan = QuitPlan.objects.filter(userid=id).get(planid = planid)
            plan = QuitPlan.objects.filter(userid=id).get(pk = planid)
            print(plan)
            plan.addiction_type = plan_data['addiction_type']
            plan.how_often = plan_data['how_often']
            plan.start_day = plan_data['start_day']
            plan.buddy = plan_data['buddy']
            plan.amt_spent_weekly = plan_data['amt_spent_weekly']
            plan.reason_to_quit = plan_data['reason_to_quit']
            plan.priority = plan_data['priority']
            plan.commit_duration = datetime.timedelta(weeks = int(plan_data['commit_duration'])*4)
            plan.save()
            return JsonResponse("success", safe=False)
        except:
            return JsonResponse("fail", safe=False)

#community
class community(APIView):
    def post(self, request, id):
        forum_data = JSONParser().parse(request)
        try:
            forum = Forum(userid = id, date_posted = date.today(), post = forum_data['post'])
            forum.save()
            return JsonResponse("success", safe=False)
        except:
            return JsonResponse("fail", safe=False)

    def get(self, request, id):
        post_data = Forum.objects.filter(userid = id).order_by('-date_posted')
        print(post_data[0].id)
        profile = Users.objects.filter(id = id)[:1].get()
        name = profile.name
        content = []
        inner_content = []
        content.append(name)
        for i in post_data:
            temp = {}
            temp['id'] = i.id
            temp['userid'] = id
            temp['post'] = i.post
            temp['date_posted'] = i.date_posted
            inner_content.append(temp)
        content.append(inner_content)
        return Response(content)

    def delete(self, request, id):
        post_data = JSONParser().parse(request)
        try:
            dePost = Forum.objects.filter(userid = id).get(id = post_data['postid'])
            dePost.delete()
            return JsonResponse("success", safe=False)
        except:
            return JsonResponse("fail",safe=False)
