import React, { useCallback, useEffect, useMemo, useState } from "react";
import { 
    Container, 
    Header, 
    HeaderContent, 
    Profile, 
    Content, 
    Schedule, 
    NextAppointment, 
    Section, 
    Calendar,
    Appointment,
    NoAppointment 
} from "./styles";
import { isToday, format, parseISO } from 'date-fns'
import ptBr from 'date-fns/locale/pt-BR'
import LogoImg from "../../assets/logo.svg";
import DayPicker, { DayModifiers } from "react-day-picker";
import  'react-day-picker/lib/style.css'
import { FiClock, FiPower } from "react-icons/fi";
import { useAuth } from "../../hooks/Auth";
import api from "../../services/ApiClient";
import { isAfter } from "date-fns";


interface MonthAvailabilityItem {
  day:number;
  available: boolean
}

interface Appointment {
  id: string;
  date: string;
  hourFormatted: string;
  user: {
    name:string;
    avatar_url:string;
  }
}


const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [monthAvailability, setMonthAvailability] = useState<MonthAvailabilityItem[]>([])
  const [appointments, setAppointments] = useState<Appointment[]>([])

  const handleDateChange = useCallback((day:Date, modifiers:DayModifiers ) => {
    if(modifiers.available && !modifiers.disabled){
      setSelectedDate(day)
    }
  }, [])

  const handleMonthChange = useCallback((month:Date) => {
    setCurrentMonth(month)
  }, [])

  useEffect(() => {
    api.get(`/providers/${user.id}/month-availability`, {
      
      params: {
        year: currentMonth.getFullYear(),
        month: currentMonth.getMonth() + 1,
      }
    }).then(response => {
      setMonthAvailability(response.data)
    })
  },[currentMonth, user.id])

  useEffect(() => {
    api.get<Appointment[]>('/appointments/me', {
      params: {
        year: selectedDate.getFullYear(),
        month: selectedDate.getMonth() + 1,
        day: selectedDate.getDate(),
      }
    }).then(response => {
      const appointmentFormatted = response.data.map(appointments => {
        return {
          ...appointments,
          hourFormatted: format(parseISO(appointments.date), 'HH:mm')
        }
      } )
      setAppointments(appointmentFormatted)
    })
  },[selectedDate,currentMonth ])

  const disableDays = useMemo(() => {
    const dates = monthAvailability.filter(monthDay => monthDay.available === false).map(monthDay => {
      const year = currentMonth.getFullYear();
      const month = currentMonth.getMonth();
      return new Date(year,month, monthDay.day)
    })
    return dates
  }, [currentMonth, monthAvailability])

  const selectDateAsText = useMemo(() => {
    return format(selectedDate, "'Dia' dd 'de 'MMMM", {locale: ptBr})
  }, [selectedDate])

  const selectWeekDay = useMemo(() => {
    return format(selectedDate, 'cccc', { locale:ptBr })
  },[selectedDate])

  const morningAppointments = useMemo(() => {
    return appointments.filter(appointment => {
      return parseISO(appointment.date).getHours() < 12
    })
  },[appointments])

  const afternoonAppointments = useMemo(() => {
    return appointments.filter(appointment => {
      return parseISO(appointment.date).getHours() >= 12
    })
  },[appointments])

  const nextAppointment = useMemo(() => {
    return appointments.find(appointment => {
      
      
      return isAfter(parseISO(appointment.date), new Date())
    });
  }, [appointments]);


  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={LogoImg} alt="Gobarber" />
          <Profile>
            <img src=/*{user.avatar_url}*/ "https://avatars.githubusercontent.com/u/89440440?v=4"
            alt={user.name} />
            <div>
              <span>Bem-vindo,</span>
              <a href='/Profile'>{user.name}</a>
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>
      <Content> 
          <Schedule>
              
            <h1>Horários agendados</h1>
            <p>
                {isToday(selectedDate) && <span>Hoje</span>}
                <span>{selectDateAsText}</span>
                <span>{selectWeekDay}</span>
            </p>
            { nextAppointment ? (
              
              <NextAppointment >
              <strong>Agendamento a seguir</strong>
              <div>
                  <img src=/*{nextAppointment.user.avatar_url}*/ 
                  "https://avatars.githubusercontent.com/u/89440440?v=4" 
                  alt={nextAppointment.user.name} />
                  <strong>{nextAppointment.user.name}</strong>
                  <span>
                      <FiClock size={20} />
                      {nextAppointment.hourFormatted}
                  </span>
              </div>
          </NextAppointment>
            ) : (
              <NoAppointment>
                <div>Nenhum agendamento a seguir...</div>
              </NoAppointment>
            )}
            
          <Section>
              <strong>Manhã</strong>
              {morningAppointments.length === 0 && (
              <p>Nenhum agendamento neste período</p>
            )}
              {morningAppointments.map(appointment => (
                <Appointment>
                <span>
                  <FiClock/>
                  {appointment.hourFormatted}
                </span>
                <div>
                <img 
                src=/*{ appointment.user.avatar_url }*/
                "https://avatars.githubusercontent.com/u/89440440?v=4" 
                    alt={appointment.user.name} />
                    <strong>{appointment.user.name}</strong>
                </div>
              </Appointment>
              )) }
              
          </Section>

          <Section>
              <strong>Tarde</strong>
              {afternoonAppointments.length === 0 && (
              <p>Nenhum agendamento neste período</p>
            )}
              {afternoonAppointments.map(appointment => (
                <Appointment>
                <span>
                  <FiClock/>
                  {appointment.hourFormatted}
                </span>
                <div>
                <img 
                src=/*{ appointment.user.avatar_url }*/
                "https://avatars.githubusercontent.com/u/89440440?v=4" 
                    alt={appointment.user.name} />
                    <strong>{appointment.user.name}</strong>
                </div>
              </Appointment>
              )) }
          </Section>
          </Schedule>
          <Calendar>
            <DayPicker 
            weekdaysShort={['D','S','T','Q','Q','S','S']}
            fromMonth={new Date()}
            disabledDays= {[{ daysOfWeek:[0,6] }, ...disableDays]}
            selectedDays={selectedDate}
            modifiers={{ available: { daysOfWeek: [1,2,3,4,5,] } }}
            onMonthChange={ handleMonthChange }
            onDayClick={ handleDateChange }
            months={[
              'Janeiro',
              'Fevereiro',
              'Março',
              'Abril',
              'Maio',
              'Junho',
              'Julho',
              'Agosto',
              'Setembro',
              'Outubro',
              'Novembro',
              'Dezembro',
            ]}
            />
          </Calendar>
          
      </Content>
    </Container>
  );
};

export default Dashboard;
