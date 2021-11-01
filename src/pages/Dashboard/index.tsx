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
    Appointment 
} from "./styles";
import LogoImg from "../../assets/logo.svg";
import DayPicker, { DayModifiers } from "react-day-picker";
import  'react-day-picker/lib/style.css'
import { FiClock, FiPower } from "react-icons/fi";
import { useAuth } from "../../hooks/Auth";
import api from "../../services/ApiClient";


interface MonthAvailabilityItem {
  day:number;
  available: boolean
}


const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [monthAvailability, setMonthAvailability] = useState<MonthAvailabilityItem[]>([])

  const handleDateChange = useCallback((day:Date, modifiers:DayModifiers ) => {
    if(modifiers.available){
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

  const disableDays = useMemo(() => {
    const dates = monthAvailability.filter(monthDay => monthDay.available === false).map(monthDay => {
      const year = currentMonth.getFullYear();
      const month = currentMonth.getMonth();
      return new Date(year,month, monthDay.day)
    })
    return dates
  }, [currentMonth, monthAvailability])

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
                <span>Hoje</span>
                <span>dia 06</span>
                <span>Segunda-feira</span>
            </p>
            <NextAppointment>
                <strong>Atendimento a seguir</strong>
                <div>
                    <img src="https://avatars.githubusercontent.com/u/89440440?v=4" 
                    alt="Deividy Ferreira" />
                    <strong>{user.name}</strong>
                    <span>
                        <FiClock size={20} />
                        08:00
                    </span>
                </div>
            </NextAppointment>
          <Section>
              <strong>Manhã</strong>
              <Appointment>
                <span>
                  <FiClock/>
                  08:00
                </span>
                <div>
                <img src="https://avatars.githubusercontent.com/u/89440440?v=4" 
                    alt="Deividy Ferreira" />
                    <strong>{user.name}</strong>
                </div>
              </Appointment>
              <Appointment>
                <span>
                  <FiClock/>
                  08:00
                </span>
                <div>
                <img src="https://avatars.githubusercontent.com/u/89440440?v=4" 
                    alt="Deividy Ferreira" />
                    <strong>{user.name}</strong>
                </div>
              </Appointment>
          </Section>

          <Section>
              <strong>Tarde</strong>
              <Appointment>
                <span>
                  <FiClock/>
                  08:00
                </span>
                <div>
                <img src="https://avatars.githubusercontent.com/u/89440440?v=4" 
                    alt="Deividy Ferreira" />
                    <strong>{user.name}</strong>
                </div>
              </Appointment>
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
